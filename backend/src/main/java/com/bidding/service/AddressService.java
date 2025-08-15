package com.bidding.service;

import java.util.List;

import com.bidding.entity.Address;
import com.bidding.entity.User;

public interface AddressService {
	
	Address addAddress(Address address);
	
	Address updateAddress(Address address);
	
	Address getAddressById(int addressId);

}
