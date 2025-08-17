package Lumina.Services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;

@Service
public class AiService {
	
	@Value("${python.path}")
	private String pythonPath;
	
	@Value("${ai.tags.script}")
	private String tagsScriptPath;
	
	public List<String> extractTags(String title, String content) throws IOException {
		ProcessBuilder pb = new ProcessBuilder(
				pythonPath,
				tagsScriptPath,
				title,
				content
		);
		Process process = pb.start();
		BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
		StringBuilder output = new StringBuilder();
		String line;
		while ((line = reader.readLine()) != null) {
			output.append(line);
		}
		
		ObjectMapper mapper = new ObjectMapper();
		
		return mapper.readValue(output.toString(), new TypeReference<List<String>>() {});
	}
}
