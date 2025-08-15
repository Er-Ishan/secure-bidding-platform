package com.bidding.service;

import java.util.List;

import com.bidding.entity.Product;
import com.bidding.entity.ProductOffer;
import com.bidding.entity.User;

public interface ProductOfferService {
	
	ProductOffer addOffer(ProductOffer offer);
	
	ProductOffer updateOffer(ProductOffer offer);
	
	ProductOffer getOfferById(int offerId);
	
	List<ProductOffer> getOffersByUserAndStatus(User user, List<String> status);
	
	List<ProductOffer> getOffersByProductAndStatus(Product product, List<String> status);
	

}
