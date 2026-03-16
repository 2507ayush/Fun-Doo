package com.fundoo.controller;

import java.util.Map;
import com.fundoo.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.fundoo.dto.LoginRequestDTO;
import com.fundoo.dto.RegisterRequestDTO;
import com.fundoo.entity.User;
import com.fundoo.services.UserService;
import com.fundoo.services.emailService;


@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
	
	@Autowired
	private UserService users;
	@Autowired
	private UserRepository urepo;
	@Autowired
	private emailService emailService;
	
	@PostMapping("/register")
	public String RegisterUSer(@RequestBody RegisterRequestDTO rDTO) {
		return users.registerUser(rDTO);
	}
	
	@PostMapping("/login")
	public User LoginUser(@RequestBody LoginRequestDTO lDTO) {
		return users.loginUser(lDTO);
	}
	
	
	@PostMapping("/send-otp")
	public String sendOtp(@RequestBody Map<String,String> request){

	    String email = request.get("email");

	    User user = urepo.findByemail(email);

	    if(user == null){
	        throw new RuntimeException("User not found");
	    }

	    int otp = (int)(Math.random()*900000)+100000;

	    user.setOtp(otp);
	    urepo.save(user);

	    emailService.sendOtp(email, otp);

	    return "OTP sent successfully";
	}
	
	@PostMapping("/verify-otp")
	public String verifyOtp(@RequestBody Map<String,String> request){

	    String email = request.get("email");
	    int otp = Integer.parseInt(request.get("otp"));

	    User user = urepo.findByemail(email);

	    if(user.getOtp() != otp){
	        throw new RuntimeException("Invalid OTP");
	    }

	    return "OTP verified";
	}
	
	@PostMapping("/reset-password")
	public String resetPassword(@RequestBody Map<String,String> request){

	    String email = request.get("email");
	    String password = request.get("password");

	    User user = urepo.findByemail(email);

	    user.setPassword(password);

	    urepo.save(user);

	    return "Password updated successfully";
	}
	

}
