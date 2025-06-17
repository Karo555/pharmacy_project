import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.pharmacy.service.ProfileService;
import com.example.pharmacy.model.ProfileData;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @PutMapping
    public ResponseEntity<?> updateProfile(@Valid @RequestBody ProfileData profileData) {
        try {
            profileService.updateProfile(profileData);
            return ResponseEntity.ok("Profile updated successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body("Validation error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating profile: " + e.getMessage());
        }
    }
}