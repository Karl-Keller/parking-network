# parking-network
A hyperledger fabric network for minimal hardware parking transactions.

The purpose of the network is to perform parking transactions between parking spaces, people, and their vehicles.

Participants:  
    Person
        wallet
        email
        phone
    Vehicle
        ID/VIN
        License Plate
        Permits
        Location 
    Parking Enforcement
    Parking Authority
    City Treasurer
Assets: 
    Parking Space
        type: free, paid, permit
        status: available, occupied
        GPS location
        Geofence description
    Permit
        issuer: city, private
        location: address
Use Cases:
    1. Find nearest 'available' free parking 
        --for those looking for free parking only, find the nearest open space.
        --show alternatives
    2. Find nearest 'available' paid or free parking
        --for those willing to pay for parking, find the cheapest, nearest open space.
        --show alternatives
    3. Find 'available' permit parking
        --given the permit associated with your vehicle, find the nearest open space.
        --show alternatives
    4. Contract to park (initiated by person)
        --while vehicle within geofence of any parking space
            --initiates parking smart contract
            --moves maximum payment to contract
            --changes parking space state to 'occupied'
            --establishes a 'keep alive' location status for the vehicle
            --moves maximum payment for parking space into contract wallet
            --timestamps the transaction
    5. Leave parking space
        --if vehicle location not in parking space geofence
            --compares contract transaction timestamp to current time, calculates elapsed time
            --if paid parking spot, executes payment transaction to parking authority
                --if funds received
                    --changes parking space status
    6. Vehicle exceeds maximum park time
        --If car is parked past maximum time
            --another smart contract is instantiated
            --the maximum amount already in the current smart contract is transferred to the parking authority
            --a notification is sent to the person's phone, e.g. email or text
            --public parking violation is sent to parking enforcement
    7. Car violates permit parking schedule
        --If car is parked in permitted parking and violates parking schedule
            --parking violation is sent to parking enforcement

    Random Requirements
        --Vehicles have GPS locations available to phone app
        --Smart Contract wallets with $ transfers
        --Wallets for charging parking fees, e.g. stellar, phone wallets
        --Access control
            --Contract to park (any)
            --Browse parking data(parking authority, parking enforcement)
            --Browse contract details(parking authority, city treasurer)
            --Modify contract details(city treasurer)
            --Remit funds(city treasurer)
        
