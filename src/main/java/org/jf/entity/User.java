package org.jf.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
	private int id;
	private String no;
	private String pwd;
	private String tel;
	private String email;
	private String name;
	private String age;
	private String birth;
	private String role;
	private String address;
}
