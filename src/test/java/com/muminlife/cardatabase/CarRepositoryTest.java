package com.muminlife.cardatabase;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import com.muminlife.cardatabase.domain.Car;
import com.muminlife.cardatabase.domain.CarRepository;
import com.muminlife.cardatabase.domain.Owner;

@RunWith(SpringRunner.class)
@DataJpaTest
public class CarRepositoryTest {
	@Autowired
	private TestEntityManager entityManager;

	@Autowired
	private CarRepository repository;

	@Test
	public void saveCar() {

		Owner owner1 = new Owner("John", "Johnson");
		entityManager.persistAndFlush(owner1);
		Car car = new Car("Tesla", "Model X", "White", "ABC-1234", 2017, 86000, owner1);
		entityManager.persistAndFlush(car);

		assertThat(car.getId()).isNotNull();
	}
	
	@Test
	public void deleteCars() {
		Owner owner1 = new Owner("John", "Johnson");
		entityManager.persistAndFlush(owner1);
		entityManager.persistAndFlush(new Car("Tesla", "Model X", "White", "ABC-1234", 2017, 86000, owner1));
		entityManager.persistAndFlush(new Car("Mini", "Cooper", "Yellow", "BWS-3007", 2015, 24500, owner1));
		
		repository.deleteAll();
		assertThat(repository.findAll()).isEmpty();
	}	
}
