package com.fundoo.services;

import java.util.Optional;
import com.fundoo.entity.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fundoo.dto.LoginRequestDTO;
import com.fundoo.dto.RegisterRequestDTO;
import com.fundoo.repository.UserRepository;


@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository repo;

	@Override
	public String registerUser(RegisterRequestDTO registerDTO) {
		User user = new User();
		
		user.setFirstName(registerDTO.getFirstName());
		user.setLastName(registerDTO.getLastName());
		user.setEmail(registerDTO.getEmail());
		user.setPassword(registerDTO.getPassword());
		
		repo.save(user);
		return "User Registered Succesfully!";
		
	}
	@Override
	public User loginUser(LoginRequestDTO loginDTO) {

	    Optional<User> user = repo.findByEmail(loginDTO.getEmail());

	    if(user.isPresent() && user.get().getPassword().equals(loginDTO.getPassword())) {
	        return user.get();
	    }

	    return null;

	}
}

	
	