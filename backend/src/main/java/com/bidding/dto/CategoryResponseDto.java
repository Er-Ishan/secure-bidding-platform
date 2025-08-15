package com.bidding.dto;

import java.util.ArrayList;
import java.util.List;

import com.bidding.entity.Category;

import lombok.Data;

@Data
public class CategoryResponseDto extends CommonApiResponse {
	
	private List<Category> categories = new ArrayList<>(); 

}
