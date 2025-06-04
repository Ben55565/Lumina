package Lumina.Repositories;

import Lumina.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	boolean existsByEmail (String email);
	
	boolean existsByDisplayName (String displayName);
	
	boolean existsByPhoneNum (String phoneNum);
	
	Optional<User> findByEmail(String email);
}
