import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/resource")
public class YourController {
    // ...existing code...

    @PutMapping("/{id}")
    public ResponseEntity<?> updateResource(@PathVariable Long id, @RequestBody ResourceDto resourceDto) {
        // Logic to update the resource
        return ResponseEntity.ok(service.updateResource(id, resourceDto));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> partiallyUpdateResource(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        // Logic to partially update the resource
        return ResponseEntity.ok(service.partiallyUpdateResource(id, updates));
    }

    // ...existing code...
}