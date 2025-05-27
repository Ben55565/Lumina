package Lumina.Entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table (name = "\"user_db\"")
public class User {
	
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	@Column (name = "id")
	private int id;
	@Column (name = "email")
	private String email;
	@Column (name = "password")
	private String password;
	@Column (name = "name")
	private String name;
	@Column (name = "anonymity")
	private boolean isAnonymous;
	@Column (name = "birth_date")
	private LocalDate birthDate;
	@Column (name = "phone_number")
	private String phoneNum;
	@Column (name = "display_name")
	private String displayName;
	@Column (name = "creation_date", updatable = false, insertable = false)
	private LocalDate createdAt;
	
	public User (String email, String password, String name, boolean isAnonymous, LocalDate birthDate, String phoneNum, String displayName) {
		this.email = email;
		this.password = password;
		this.name = name;
		this.isAnonymous = isAnonymous;
		this.birthDate = birthDate;
		this.phoneNum = phoneNum;
		this.displayName = displayName;
	}
	
	public User updateFrom (User user) {
		this.birthDate = user.getBirthDate();
		this.displayName = user.getDisplayName();
		this.isAnonymous = user.isAnonymous();
		this.email = user.getEmail();
		this.phoneNum = user.getPhoneNum();
		this.name = user.getName();
		this.password = user.getPassword();
		
		return this;
		
	}
	
	public LocalDate getBirthDate () {
		return birthDate;
	}
	
	public void setBirthDate (LocalDate birthDate) {
		this.birthDate = birthDate;
	}
	
	public String getDisplayName () {
		return displayName;
	}
	
	public boolean isAnonymous () {
		return isAnonymous;
	}
	
	public String getEmail () {
		return email;
	}
	
	public void setEmail (String email) {
		this.email = email;
	}
	
	public String getPhoneNum () {
		return phoneNum;
	}
	
	public String getName () {
		return name;
	}
	
	public String getPassword () {
		return password;
	}
	
	public void setPassword (String password) {
		this.password = password;
	}
	
	public void setName (String name) {
		this.name = name;
	}
	
	public void setPhoneNum (String phoneNum) {
		this.phoneNum = phoneNum;
	}
	
	public void setAnonymous (boolean anonymous) {
		isAnonymous = anonymous;
	}
	
	public void setDisplayName (String displayName) {
		this.displayName = displayName;
	}
	
	public int getId () {
		return id;
	}
	
	public void setId (int id) {
		this.id = id;
	}
	
	public LocalDate getCreatedAt () {
		return createdAt;
	}
	
	public void setCreatedAt (LocalDate createdAt) {
		this.createdAt = createdAt;
	}
	
	@Override
	public String toString () {
		return "User{" + "id=" + id + ", email='" + email + '\'' + ", password='" + password + '\'' + ", name='" + name + '\'' + ", isAnonymous=" + isAnonymous + ", birthDate=" + birthDate + ", phoneNum='" + phoneNum + '\'' + ", displayName='" + displayName + '\'' + ", createdAt=" + createdAt + '}';
	}
}
