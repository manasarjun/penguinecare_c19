package se.kth.sda7.wdgroupproject.auth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class AuthService {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTEncoderDecoder jwtEncoderDecoder;

    private static final Logger logger = LoggerFactory.getLogger("AuthService");

    public String getLoggedInUserEmail() {
        Object maybeUserDetails = SecurityContextHolder.getContext().getAuthentication().getDetails();
        if (maybeUserDetails instanceof UserDetails) {
            return ((UserDetails) maybeUserDetails).getUsername();
        }
        return null;
    }

    public String getLoggedInUserName() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String currentUserName = authentication.getName();
            System.out.println("currentUserName");
            return currentUserName;
        }
        return null;
    }


    public String createAuthToken(String email) {
        HashMap<String, String> claims = new HashMap<>();
        claims.put("email", email);
        return jwtEncoderDecoder.createToken(claims);
    }

    public String authenticate(String email, String password) throws AuthenticationException {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        return createAuthToken(email);
    }

}
