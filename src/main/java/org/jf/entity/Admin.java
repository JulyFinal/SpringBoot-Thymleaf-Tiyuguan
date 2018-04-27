package org.jf.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 管理员权限
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Admin {
	private int id;
	private String no;
	private String pwd;
	private String name;
	private String email;
	private String tel;
}
