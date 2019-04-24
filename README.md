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
    Parking Spaces
        type: free, paid, permit
        occupied: boolean
        GPS location
        Geofence description
    Permit
        issuer: city, private
        location: address
Use Cases:
    1. Find nearest 'open' free parking 
        --for those looking for free parking only, find the nearest open spot.
        --show alternatives
    2. Find nearest 'open' paid or free parking
        --for those willing to pay for parking, find the cheapest, nearest open spot.
        --show alternatives
    3. Find 'permit' parking
        --given the permit associated with your vehicle, find the nearest open spot.
        --show alternatives
    4. Contract to park
        --occupies parking spot
        --initiates parking smart contract
        --moves maximum payment to contract
        --charges parking spot state to 'occupied'
        --establishes a 'keep alive' location status for the vehicle
        --moves maximum payment for parking space into contract wallet
    5. Leave parking space
        --
