package com.bidding.dto;

import java.util.ArrayList;
import java.util.List;

import com.bidding.entity.ProductOffer;

import lombok.Data;

@Data
public class ProductOfferResponse extends CommonApiResponse {
	
	List<ProductOffer> offers = new ArrayList<>();

}
