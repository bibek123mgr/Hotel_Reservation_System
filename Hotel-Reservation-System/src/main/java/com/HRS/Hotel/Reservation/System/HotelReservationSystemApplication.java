package com.HRS.Hotel.Reservation.System;

import com.HRS.Hotel.Reservation.System.DAO.ReservationDao;
import com.HRS.Hotel.Reservation.System.DAO.RoomDao;
import com.HRS.Hotel.Reservation.System.POJO.Reservation;
import com.HRS.Hotel.Reservation.System.POJO.Room;
import com.HRS.Hotel.Reservation.System.enums.ReservationStatus;
import com.HRS.Hotel.Reservation.System.enums.RoomStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.time.LocalDateTime;
import java.util.List;

@SpringBootApplication
@EnableJpaAuditing
@EnableScheduling
public class HotelReservationSystemApplication {

	@Autowired
	private ReservationDao reservationDao;

	@Autowired
	private RoomDao roomDao;

	public static void main(String[] args) {
		SpringApplication.run(HotelReservationSystemApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer webMvcConfigurer() {
		return new WebMvcConfigurer() {

			// Enable CORS for MVC controllers/resources
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins(
								"http://localhost:5173",
								"http://discover.localhost:5173"
						)
						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
						.allowedHeaders("*")
						.allowCredentials(true);
			}

			// Serve static files from uploads folder
			@Override
			public void addResourceHandlers(ResourceHandlerRegistry registry) {
				registry.addResourceHandler("/uploads/**")
						.addResourceLocations("file:" + System.getProperty("user.dir") + "/uploads/");
			}
		};
	}

	// Cors config for Spring Security
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(List.of(
				"http://localhost:5173",
				"http://discover.localhost:5173"
		));
		configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
		configuration.setAllowedHeaders(List.of("*"));
		configuration.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

	@Scheduled(cron = "0 0 12 * * ?")
	@Transactional
	public void autoCheckoutAndFreeRooms() {
		LocalDateTime now = LocalDateTime.now();

		List<Reservation> expiredReservations = reservationDao
				.findByReservationStatusInAndStatusTrueAndCheckOutDateBefore(
						List.of(ReservationStatus.PENDING, ReservationStatus.CONFIRMED, ReservationStatus.CHECKED_IN),
						now);

		for (Reservation reservation : expiredReservations) {
			reservation.setReservationStatus(ReservationStatus.CHECKED_OUT);

			Room room = reservation.getRoom();
			if (room != null && room.getRoomStatus() != RoomStatus.AVAILABLE) {
				room.setRoomStatus(RoomStatus.AVAILABLE);
				roomDao.save(room);
			}

			reservationDao.save(reservation);
		}

		System.out.println("Auto-checkout task complete. Updated " + expiredReservations.size() + " reservations.");
	}
}
