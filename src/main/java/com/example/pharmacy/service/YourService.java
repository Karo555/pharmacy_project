@Service
public class YourService {
    // ...existing code...

    public ResourceDto updateResource(Long id, ResourceDto resourceDto) {
        // Logic to update the resource in the database
        // Example: Find the resource by ID, update fields, and save
        Resource resource = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Resource not found"));
        resource.setName(resourceDto.getName());
        resource.setDescription(resourceDto.getDescription());
        return repository.save(resource);
    }

    public ResourceDto partiallyUpdateResource(Long id, Map<String, Object> updates) {
        // Logic to partially update the resource in the database
        Resource resource = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Resource not found"));
        updates.forEach((key, value) -> {
            // Use reflection or manual mapping to update fields
            Field field = ReflectionUtils.findField(Resource.class, key);
            if (field != null) {
                field.setAccessible(true);
                ReflectionUtils.setField(field, resource, value);
            }
        });
        return repository.save(resource);
    }

    // ...existing code...
}
