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
        fee: default 0
        GPS location
        Geofence description
        Parking period: default 0 min
    Permit
        issuer: city, private
        location: address
Use Cases:
    0. CRUD parking space
    1. Set parking space fee
        --default 0
    2. Find nearest 'available' free parking 
        --for those looking for free parking only, find the nearest open space.
        --show alternatives
    3. Find nearest 'available' paid or free parking
        --for those willing to pay for parking, find the cheapest, nearest open space.
        --show alternatives
    4. Find nearest 'available' permit parking
        --given the permit associated with your vehicle, find the nearest open space.
        --show alternatives
    5. Contract to park (initiated by person)
        --while vehicle within geofence of any parking space
            --initiates parking smart contract
            --moves maximum payment to contract
            --changes parking space state to 'occupied'
            --establishes a 'keep alive' location status for the vehicle
            --moves maximum payment for parking space into contract wallet
            --timestamps the transaction
            --starts a time counter
    6. Leave parking space
        --if vehicle location not in parking space geofence
            --compares contract transaction timestamp to current time, compares elapsed time to time counter
            --sets parking period to greater of elapsed time and time counter
            --if paid parking spot, executes payment transaction to parking authority
                --if funds received
                    --changes parking space status
    7. Vehicle exceeds maximum park time (auto-generated)
        --If car is parked past maximum time
            --another smart contract is instantiated
            --the maximum amount already in the current smart contract is transferred to the parking authority
            --a notification is sent to the person's phone, e.g. email or text
            --public parking violation is sent to parking enforcement
    8. Car violates permit parking schedule (auto-generated)
        --If car is parked in permitted parking and violates parking schedule
            --parking violation is sent to parking enforcement

    Various other requirements
        --Vehicles have GPS locations available to phone app
        --Smart Contract wallets with $ transfers
        --Wallets for charging parking fees, e.g. stellar, phone wallets
        --Access control
            --CRUD parking space (parking authority)
            --Set parking space fee (parking authority)
            --Find nearest 'available' (public)
            --Contract to park/Leave parking space (public)
            --Browse parking data (parking enforcement)
            --Browse contract details (public -own, city treasurer -all)
            --Modify contract details (city treasurer)
            --Remit funds (city treasurer)
        
