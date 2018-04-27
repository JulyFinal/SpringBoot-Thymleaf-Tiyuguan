package org.jf.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Login {
	private int id;
	private String name;
	private String role;
	private String email;
	public Login(String role) {
		this.role = role;
	}
}
