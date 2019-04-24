/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class parking extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const vehicles = [
            {
                VIN: '1FADP3N20EL463163',
                licensePlate: 'YXZ752G',
                permits: '',
                location: 'F8QX+G7 Cockeysville, Maryland',
            },
            {
                VIN: '4S4BSBNCXG3289779',
                licensePlate: 'YXZ123G',
                permits: '',
                location: 'F8QW+89 Cockeysville, Maryland',
            },
            {
                VIN: '1FTWW33F91EB46735',
                licensePlate: 'YXZ321G',
                permits: '',
                location: 'F9Q2+XV Cockeysville, Maryland',
            },
        ];
        const persons = [
            {
                realID: 'T62702247',
                wallet: 'adsf98709a8790asdf9087a987sda8f79087adsf',
                email: 'kkeller2@jmttg.com',
                phone: '1+ 4104032623'
            },
            {
                realID: 'T62702248',
                wallet: 'adsf98709a8790asdf9087a987sda8f79087aead',
                email: 'jramsey@jmttg.com',
                phone: '1+ 4103165555'
            },
            {
                realID: 'T62702249',
                wallet: 'adsf98709a8790asdf9087a987sda8f79087fedf',
                email: 'jharrison@jmttg.com',
                phone: '1+ 4108675309'
            }
        ];
        const parkingSpaces = [
            {
                type: 'free',
                status: 'available',
                fee: 0,
                location: 'F8QX+G7 Cockeysville, Maryland',
                geofenceDescription: '',
                parkingPeriod: ''
            }
        ];

        for (let i = 0; i < vehicles.length; i++) {
            vehicles[i].docType = 'vehicle';
            await ctx.stub.putState('VEHICLE' + i, Buffer.from(JSON.stringify(vehicles[i])));
            console.info('Added <--> ', vehicles[i]);
        }
        for (let i = 0; i < persons.length; i++) {
            persons[i].docType = 'person';
            await ctx.stub.putState('PERSON' + i, Buffer.from(JSON.stringify(persons[i])));
            console.info('Added <--> ', persons[i]);
        }
        for (let i = 0; i < parkingSpaces.length; i++) {
            parkingSpaces[i].docType = 'parkingSpace';
            await ctx.stub.putState('PARKINGSPACE' + i, Buffer.from(JSON.stringify(parkingSpaces[i])));
            console.info('Added <--> ', parkingSpaces[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryParkingSpace(ctx, parkingLocation) {
        const parkingSpaceAsBytes = await ctx.stub.getState(parkingLocation);
        if(!parkingSpaceAsBytes || parkingSpaceAsBytes.length === 0) {
            throw new Error('${parkingLocation} does not exist');
        }
        console.log(parkingSpaceAsBytes.toString());
        return parkingSpaceAsBytes.toString();
    };

    async createParkingSpace(ctx, type, status, fee, GPSLocation, geofence, parkingPeriod) {
        console.info('============ START : Create Parking Space =============');
        const parkingSpace = {
            type,
            status,
            fee,
            GPSLocation,
            geofence,
            parkingPeriod
        };
        await ctx.stub.putState(GPSLocation, Buffer.from(JSON.stringify(parkingSpace)));
        console.info('============= END : Create Parking Space ==============');
    }

    async setParkingSpaceFee(ctx, parkingLocation, fee) {
        console.info('==================START: Set Parking Space Fee =================');
        const parkingSpaceAsBytes = await ctx.stub.getState(parkingLocation);
        if(!parkingSpaceAsBytes || parkingSpaceAsBytes.length === 0) {
            throw new Error('${parkingLocation} does not exist');
        }
        ///Set the fee here
        await ctx.stub.putState(parkingLocation, Buffer.from(JSON.stringify(parkingSpaceAsBytes)));
        return parkingSpaceAsBytes.toString();
    }

    async findNearestFreeParking(ctx, vehicleLocation) {
        ///route finder
    }

    async findNearestPaidFreeParking(ctx, vehicleLocation) {
        ///multi-objective route finder
    }

    async findNearestPermitParking(ctx, vehicleLocation) {
        ///check permits against parking accepting those permits
        ///route finder
    }

    async contractToPark(ctx, GPSLocation, realID) {
        ///confirm in geofence of parking space
        ///initiate smart contract
        ///move maximum payment to sc wallet
        ///change parking space state to 'occupied'
        ///establish 'keep alive' location status for the vehicle
        ///timestamps the transaction
        ///starts a time counter
    }

    async leaveParkingSpace(ctx, GPSLocation, vehicleLocation, readID) {
        ///if vehicle location not in geofence
        ///compute elapsed time
        ///execute payment from sc wallet to city wallet
        ///change parking space status to 'empty'
    }
    async queryAllCars(ctx) {
        const startKey = 'CAR0';
        const endKey = 'CAR999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

    async changeCarOwner(ctx, carNumber, newOwner) {
        console.info('============= START : changeCarOwner ===========');

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.owner = newOwner;

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');
    }

}

module.exports = FabCar;
