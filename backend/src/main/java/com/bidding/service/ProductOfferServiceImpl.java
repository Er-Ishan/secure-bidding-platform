package com.bidding.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.bidding.dao.ProductOfferDao;
import com.bidding.entity.Product;
import com.bidding.entity.ProductOffer;
import com.bidding.entity.User;

@Repository
public class ProductOfferServiceImpl implements ProductOfferService {

	@Autowired
	private ProductOfferDao productOfferDao;

	@Override
	public ProductOffer addOffer(ProductOffer offer) {
		return productOfferDao.save(offer);
	}

	@Override
	public ProductOffer updateOffer(ProductOffer offer) {
		return productOfferDao.save(offer);
	}

	@Override
	public ProductOffer getOfferById(int offerId) {
		Optional<ProductOffer> optionalOffer = this.productOfferDao.findById(offerId);

		if (optionalOffer.isPresent()) {
			return optionalOffer.get();
		} else {
			return null;
		}
	}

	@Override
	public List<ProductOffer> getOffersByUserAndStatus(User user, List<String> status) {
		return productOfferDao.findByUserAndStatusIn(user, status);
	}

	@Override
	public List<ProductOffer> getOffersByProductAndStatus(Product product, List<String> status) {
		return productOfferDao.findByProductAndStatusIn(product, status);
	}

}
