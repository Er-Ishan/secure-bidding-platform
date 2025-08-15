package com.bidding.dto;

import java.math.BigDecimal;

import org.springframework.beans.BeanUtils;

import com.bidding.entity.Address;
import com.bidding.entity.User;

import lombok.Data;

@Data
public class UserDto {
	
	private int id;

	private String firstName;

	private String lastName;

	private String emailId;

	private String phoneNo;
	private String uidNo;

	private String role;

	private Address address;

	private UserDto seller;

	private String status;
	
	private BigDecimal walletAmount;
	
	public static UserDto toUserDtoEntity(User user) {
		UserDto userDto =new UserDto();
		BeanUtils.copyProperties(user, userDto, "seller");		
		return userDto;
	}

}
