package com.fundoo.services;


import com.fundoo.dto.*;
import com.fundoo.entity.User;

public interface UserService {
	String registerUser(RegisterRequestDTO registerDTO);

    User loginUser(LoginRequestDTO loginDTO);

}
