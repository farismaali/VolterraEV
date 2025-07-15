package com.volterraev.controller;

import com.volterraev.model.Review;
import com.volterraev.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/add")
    public ResponseEntity<Review> addReview(@RequestParam Long userId,
            @RequestParam Long vehicleId,
            @RequestParam int rating,
            @RequestParam String comment) {
        Review review = reviewService.addReview(userId, vehicleId, rating, comment);
        return ResponseEntity.status(201).body(review);
    }

    @GetMapping("/vehicle/{vehicleId}")
    public ResponseEntity<List<Review>> getReviewsForVehicle(@PathVariable Long vehicleId) {
        return ResponseEntity.ok(reviewService.getReviewsForVehicle(vehicleId));
    }
}
