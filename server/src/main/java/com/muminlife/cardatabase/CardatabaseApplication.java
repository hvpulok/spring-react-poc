package com.muminlife.cardatabase;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.muminlife.cardatabase.domain.Car;
import com.muminlife.cardatabase.domain.CarRepository;
import com.muminlife.cardatabase.domain.Owner;
import com.muminlife.cardatabase.domain.OwnerRepository;
import com.muminlife.cardatabase.domain.User;
import com.muminlife.cardatabase.domain.UserRepository;

@SpringBootApplication
public class CardatabaseApplication {
	private static final Logger logger = LoggerFactory.getLogger(CardatabaseApplication.class);
	@Autowired
	private CarRepository repository;

	@Autowired
	private OwnerRepository orepository;

	@Autowired
	private UserRepository urepository;

	public static void main(String[] args) {
		SpringApplication.run(CardatabaseApplication.class, args);
		logger.info("Spring Boot started successfully");
	}

	@Bean
	CommandLineRunner runner() {
		return args -> {
			logger.info("Adding mock owners to database");
			Owner owner1 = new Owner("John", "Johnson");
			Owner owner2 = new Owner("Mary", "Robinson");
			orepository.save(owner1);
			orepository.save(owner2);

			logger.info("Adding mock cars to database");
			repository.save(new Car("Ford", "Mustang", "Red", "ADF-1121", 2017, 59000, owner1));
			repository.save(new Car("Nissan", "Leaf", "White", "SSJ-3002", 2014, 29000, owner2));
			repository.save(new Car("Toyota", "Prius", "Silver", "KKO-0212", 2018, 39000, owner2));

			logger.info("Adding mock username: user password: user");
			urepository.save(new User("user", "$2a$04$1.YhMIgNX/8TkCKGFUONWO1waedKhQ5KrnB30fl0Q01QKqmzLf.Zi", "USER"));
			logger.info("Adding mock username: username: admin password: admin");
			urepository
					.save(new User("admin", "$2a$04$KNLUwOWHVQZVpXyMBNc7JOzbLiBjb9Tk9bP7KNcPI12ICuvzXQQKG", "ADMIN"));
		};
	}

}
