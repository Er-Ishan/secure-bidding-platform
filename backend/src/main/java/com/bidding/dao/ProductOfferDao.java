package com.bidding.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bidding.entity.Product;
import com.bidding.entity.ProductOffer;
import com.bidding.entity.User;

@Repository
public interface ProductOfferDao extends JpaRepository<ProductOffer, Integer> {
	
	List<ProductOffer> findByProductAndStatusIn(Product product, List<String> status);
	List<ProductOffer> findByUserAndStatusIn(User user, List<String> status);

}
