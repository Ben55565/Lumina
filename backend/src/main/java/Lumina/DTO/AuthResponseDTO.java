package Lumina.DTO;

public class AuthResponseDTO {
	
	private String result;
	private String info;
	private String token;
	
	public AuthResponseDTO (String result, String info) {
		this.result = result;
		this.info = info;
	}
	
	public AuthResponseDTO (String result, String info, String token) {
		this.result = result;
		this.info = info;
		this.token = token;
	}
	
	public String getResult () {
		return result;
	}
	
	public void setResult (String result) {
		this.result = result;
	}
	
	public String getInfo () {
		return info;
	}
	
	public void setInfo (String info) {
		this.info = info;
	}
	
	public String getToken () {
		return token;
	}
	
	public void setToken (String token) {
		this.token = token;
	}
}
