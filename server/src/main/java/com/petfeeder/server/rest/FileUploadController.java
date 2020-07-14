package com.petfeeder.server.rest;

import com.petfeeder.server.dao.UsersRepository;
import com.petfeeder.server.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Controller
public class FileUploadController {
    private Path uploadDirectory;
    private UsersRepository usersRepo;

    @Autowired
    public FileUploadController(UsersRepository usersRepo) {
        this.uploadDirectory = Paths.get("resources/userImg");
        this.usersRepo = usersRepo;
        try {
            Files.createDirectories(this.uploadDirectory);
        } catch (IOException e) {
            System.err.println("Create upload dir");
        }
    }

    @GetMapping("/user/photo/{id}")
    public ResponseEntity downloadPhoto(@PathVariable String id) {
        User user = this.usersRepo.findById(Integer.parseInt(id));
        Path path = this.uploadDirectory.resolve("photo-" + user.getId() + ".jpg");
        Resource resource = null;
        try {
            resource = new UrlResource(path.toUri());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @CrossOrigin
    @PostMapping("/user/upload/{id}")
    @ResponseBody
    public boolean uploadAll(@RequestParam("file") MultipartFile file,
                             @PathVariable String id) {
        System.out.println("Upload....");
        try {
            Path downloadedFile = this.uploadDirectory
                    .resolve(Paths.get(file.getOriginalFilename()));
            User user = usersRepo.findById(Integer.parseInt(id));
            this.usersRepo.save(user);
            user.setPhoto(downloadedFile.toString());
            Files.deleteIfExists(downloadedFile);
            Files.copy(file.getInputStream(), downloadedFile);
            return true;
        }
        catch (IOException e) {
            return false;
        }

    }

}
