package net.emsi.reservservice.web;

import net.emsi.reservservice.dto.ReservRequestDTO;
import net.emsi.reservservice.dto.ReservResponseDTO;
import net.emsi.reservservice.entities.Reserv;
import net.emsi.reservservice.model.Customer;
import net.emsi.reservservice.model.Terrain;
import net.emsi.reservservice.repository.ReservRepository;
import net.emsi.reservservice.services.CustomerRestClient;
import net.emsi.reservservice.services.TerrainRestClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
public class ReservRestController {
    private ReservRepository reservRepository;
    private TerrainRestClient terrainRestClient;
    private CustomerRestClient customerRestClient;

    public ReservRestController(ReservRepository reservRepository,
                                TerrainRestClient terrainRestClient,
                                CustomerRestClient customerRestClient) {
        this.reservRepository = reservRepository;
        this.terrainRestClient = terrainRestClient;
        this.customerRestClient = customerRestClient;
    }


    @GetMapping("/reservByCustomer/{customerId}")
    public List<Reserv> getReservationsByCustomer(@PathVariable Long customerId) {
        // Fetch all reservations for the given customer ID
        List<Reserv> reservations = reservRepository.findByCustomerId(customerId);

        // Enhance each reservation with customer and terrain details
        reservations.forEach(reservation -> {
            // Fetch and set the customer details
            Customer customer = customerRestClient.findCustomerById(reservation.getCustomerId());
            if (customer != null) {
                reservation.setCustomer(customer);
            }

            // Fetch and set the terrain details
            Terrain terrain = terrainRestClient.findTerrainById(reservation.getTerrainId());
            if (terrain != null) {
                reservation.setTerrain(terrain);

                // Ensure clubName is set once from the terrain
                String clubName = (terrain.getClub() != null && terrain.getClub().getName() != null)
                        ? terrain.getClub().getName()
                        : "Unknown Club";
                reservation.setClubName(clubName);  // Set clubName only once
            }
        });

        return reservations;
    }

    @GetMapping("/reservByTerrain/{terrainId}/reservations")
    public List<Reserv> getReservationsByTerrain(@PathVariable Long terrainId) {
        // Fetch all reservations for the given terrain ID
        List<Reserv> reservations = reservRepository.findByTerrainId(terrainId);

        // Enhance each reservation with customer and terrain details
        reservations.forEach(reservation -> {
            // Fetch and set the customer details
            Customer customer = customerRestClient.findCustomerById(reservation.getCustomerId());
            if (customer != null) {
                reservation.setCustomer(customer);
            }

            // Fetch and set the terrain details
            Terrain terrain = terrainRestClient.findTerrainById(reservation.getTerrainId());
            if (terrain != null) {
                reservation.setTerrain(terrain);
            }
        });

        return reservations;
    }

    @GetMapping("/reservations")
    public List<Reserv> getAllReservations() {
        List<Reserv> reservations = reservRepository.findAll();

        reservations.forEach(reservation -> {
            // Fetch and set the customer details
            Customer customer = customerRestClient.findCustomerById(reservation.getCustomerId());
            if (customer != null) {
                reservation.setCustomer(customer);
            }

            // Fetch and set the terrain details
            Terrain terrain = terrainRestClient.findTerrainById(reservation.getTerrainId());
            if (terrain != null) {
                reservation.setTerrain(terrain);

                // Check if the terrain has a club, then set the club name
                if (terrain.getClub() != null) {
                    reservation.setClubName(terrain.getClub().getName());  // Set the club name from terrain's associated club
                } else {
                    reservation.setClubName("Unknown Club");  // Default value if no club is associated
                }
            }
        });

        return reservations;
    }


    // Add a new reservation
    @PostMapping("/reservations")
    public ResponseEntity<ReservResponseDTO> addReservation(@RequestBody ReservRequestDTO reservRequestDTO) {
        // Validate the request
        if (reservRequestDTO.getReservDate() == null || reservRequestDTO.getCustomerId() == null || reservRequestDTO.getTerrainId() == null) {
            return ResponseEntity.badRequest().build(); // Return 400 Bad Request if any field is missing
        }

        // Fetch customer details
        Customer customer = customerRestClient.findCustomerById(reservRequestDTO.getCustomerId());
        if (customer == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Return 404 if customer not found
        }

        // Fetch terrain details
        Terrain terrain = terrainRestClient.findTerrainById(reservRequestDTO.getTerrainId());
        if (terrain == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Return 404 if terrain not found
        }

        // Create a new reservation
        Reserv reservation = new Reserv();
        reservation.setReservDate(reservRequestDTO.getReservDate());
        reservation.setCustomerId(reservRequestDTO.getCustomerId());
        reservation.setTerrainId(reservRequestDTO.getTerrainId());
        reservation.setType(terrain.getType()); // Set terrain type from the fetched terrain

        // Save the reservation
        Reserv savedReservation = reservRepository.save(reservation);

        // Build the response DTO
        ReservResponseDTO responseDTO = new ReservResponseDTO();
        responseDTO.setReservId(savedReservation.getId());
        responseDTO.setReservDate(savedReservation.getReservDate());
        responseDTO.setCustomerId(savedReservation.getCustomerId());
        responseDTO.setTerrainType(savedReservation.getType().name()); // Set terrain type
        responseDTO.setClubName(terrain.getClub() != null ? terrain.getClub().getName() : "Unknown Club"); // Set club name

        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO); // Return 201 Created with the response DTO
    }






}
