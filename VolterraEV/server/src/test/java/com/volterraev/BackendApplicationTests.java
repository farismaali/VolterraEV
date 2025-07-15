// package com.volterraev;

// import com.volterraev.dto.*;
// import com.volterraev.model.*;
// import com.volterraev.service.*;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.boot.test.mock.mockito.MockBean;
// import org.springframework.http.MediaType;
// import org.springframework.security.authentication.BadCredentialsException;
// import org.springframework.test.web.servlet.MockMvc;

// import java.time.LocalDate;
// import java.util.*;

// import static org.mockito.ArgumentMatchers.*;
// import static org.mockito.Mockito.*;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

// @SpringBootTest
// @AutoConfigureMockMvc
// class BackendApplicationTests {

// 	@Autowired
// 	private MockMvc mockMvc;

// 	@MockBean
// 	private AuthenticationService authService;

// 	@MockBean
// 	private JwtService jwtService;

// 	@MockBean
// 	private VehicleService vehicleService;

// 	@MockBean
// 	private CartService cartService;

// 	@MockBean
// 	private LoanService loanService;

// 	// Helper methods to create entities
// 	private User createTestUser() {
// 		User user = new User();
// 		user.setId(1L);
// 		user.setUsername("test");
// 		user.setPassword("encodedPass");
		
// 		return user;
// 	}

// 	private Vehicle createTestVehicle() {
// 		Vehicle vehicle = new Vehicle();
// 		vehicle.setVid(1L);
// 		vehicle.setBrand("Tesla");
// 		vehicle.setModel("Model 3");
// 		vehicle.setYear(2023);
// 		vehicle.setPrice(50000.0);
// 		vehicle.setShape(CarShape.SEDAN);
// 		vehicle.setDescription("Electric vehicle");
// 		return vehicle;
// 	}

// 	private Cart createTestCartItem() {
// 		Cart cart = new Cart();
// 		cart.setId(1L);
// 		cart.setUserId(1L);
// 		cart.setVehicleId(1L);
// 		cart.setQuantity(1);
// 		return cart;
// 	}

// 	private AccidentHistory createTestAccident() {
// 		AccidentHistory accident = new AccidentHistory();
// 		accident.setId(1L);
// 		accident.setAccidentDate(LocalDate.now());
// 		accident.setDescription("Minor collision");
// 		return accident;
// 	}

// 	// Authentication Tests
// 	@Test
// 	void registerUser_ValidCredentials_Returns201() throws Exception {
// 		User user = createTestUser();
// 		when(authService.signup(any(UserRegisterDto.class))).thenReturn(user);

// 		mockMvc.perform(post("/auth/signup")
// 						.contentType(MediaType.APPLICATION_JSON)
// 						.content("{\"username\":\"test\",\"password\":\"Test@123\"}"))
// 				.andExpect(status().isCreated());
// 	}

// 	@Test
// 	void loginUser_ValidCredentials_ReturnsToken() throws Exception {
// 		User user = createTestUser();
// 		when(authService.authenticate(any(UserLoginDto.class))).thenReturn(user);
// 		when(jwtService.generateToken(any(User.class))).thenReturn("test.token");
// 		when(jwtService.getExpirationTime()).thenReturn(3600L);

// 		mockMvc.perform(post("/auth/login")
// 						.contentType(MediaType.APPLICATION_JSON)
// 						.content("{\"username\":\"test\",\"password\":\"test\"}"))
// 				.andExpect(status().isOk())
// 				.andExpect(jsonPath("$.token").value("test.token"))
// 				.andExpect(jsonPath("$.expiresIn").value(3600));
// 	}

// 	@Test
// 	void registerUser_ShortPassword_Returns400() throws Exception {
// 		mockMvc.perform(post("/auth/signup")
// 						.contentType(MediaType.APPLICATION_JSON)
// 						.content("{\"username\":\"test\",\"password\":\"short\"}"))
// 				.andExpect(status().isBadRequest());
// 	}

// 	@Test
// 	void getAuthenticatedUser_ValidToken_ReturnsUser() throws Exception {
// 		User user = new User();
// 		user.setId(1L);
// 		user.setUsername("testuser");

// 		when(authService.getCurrentUser()).thenReturn(user);
// 		mockMvc.perform(get("/auth/me")
// 						.header("Authorization", "Bearer valid.token"))
// 				.andExpect(status().isOk())
// 				.andExpect(jsonPath("$.username").value("testuser"));
// 	}

// 	// Vehicle Tests
// 	@Test
// 	void getAllVehicles_ReturnsVehicleList() throws Exception {
// 		Vehicle vehicle = new Vehicle();
// 		vehicle.setVid(1L);
// 		vehicle.setBrand("Tesla");
// 		vehicle.setModel("Model 3");
// 		vehicle.setYear(2023);
// 		vehicle.setPrice(50000.0);
// 		vehicle.setShape(CarShape.SEDAN);
// 		vehicle.setDescription("Electric car");

// 		when(vehicleService.getAllVehicle()).thenReturn(List.of(vehicle));

// 		mockMvc.perform(get("/vehicles"))
// 				.andExpect(status().isOk())
// 				.andExpect(jsonPath("$[0].vid").value(1))
// 				.andExpect(jsonPath("$[0].brand").value("Tesla"));
// 	}

// 	@Test
// 	void createVehicle_ValidData_ReturnsCreated() throws Exception {
// 		Vehicle vehicle = createTestVehicle();
// 		when(vehicleService.saveVehicle(any(Vehicle.class))).thenReturn(vehicle);

// 		mockMvc.perform(post("/vehicles")
// 						.contentType(MediaType.APPLICATION_JSON)
// 						.content("{\"brand\":\"Tesla\",\"model\":\"Model 3\",\"year\":2023,\"price\":50000.0,\"shape\":\"SEDAN\",\"description\":\"Electric vehicle\"}"))
// 				.andExpect(status().isCreated())
// 				.andExpect(jsonPath("$.vid").exists());
// 	}

// 	@Test
// 	void registerUser_ValidCredentials_Returns201() throws Exception {
// 		User mockUser = new User();
// 		mockUser.setUsername("testuser");
// 		mockUser.setPassword("encodedPass");

// 		when(authService.signup(any(UserRegisterDto.class))).thenReturn(mockUser);

// 		mockMvc.perform(post("/auth/signup")
// 						.contentType(MediaType.APPLICATION_JSON)
// 						.content("{\"username\":\"testuser\",\"password\":\"ValidPass123!\"}"))
// 				.andExpect(status().isCreated())
// 				.andExpect(jsonPath("$.username").value("testuser"));
// 	}

// 	@Test
// 	void deleteVehicle_ValidId_ReturnsNoContent() throws Exception {
// 		// Setup
// 		Long testId = 1L;
// 		doNothing().when(vehicleService).deleteVehicle(testId);
// 		mockMvc.perform(delete("/vehicles")
// 						.param("vid", testId.toString()))
// 				.andExpect(status().isNoContent());
// 		verify(vehicleService, times(1)).deleteVehicle(testId);
// 		verifyNoMoreInteractions(vehicleService);
// 	}

// 	@Test
// 	void addAccidentToVehicle_ValidData_ReturnsCreated() throws Exception {
// 		AccidentHistory accident = createTestAccident();
// 		when(vehicleService.addAccident(anyLong(), any(AccidentRequestDto.class)))
// 				.thenReturn(accident);

// 		mockMvc.perform(post("/vehicles/accident/1")
// 						.contentType(MediaType.APPLICATION_JSON)
// 						.content("{\"accidentDate\":\"2023-01-01\",\"description\":\"Minor collision\"}"))
// 				.andExpect(status().isCreated())
// 				.andExpect(jsonPath("$.id").exists());
// 	}

// 	@Test
// 	void calculateLoan_ValidRequest_ReturnsCorrectPayment() throws Exception {
// 		when(loanService.calculateLoan(30000, 5000, 60, Optional.of(5.0)))
// 				.thenReturn(483.15);

// 		mockMvc.perform(post("/vehicles/loan")
// 						.contentType(MediaType.APPLICATION_JSON)
// 						.content("{\"amount\":30000,\"downPayment\":5000,\"term\":60,\"interestRate\":5.0}"))
// 				.andExpect(status().isOk())
// 				.andExpect(content().string("483.15"));
// 	}

// 	// Cart Tests
// 	@Test
// 	void addToCart_ValidRequest_ReturnsOk() throws Exception {
// 		Cart cartItem = createTestCartItem();
// 		when(cartService.addToCart(anyLong(), anyLong(), anyInt()))
// 				.thenReturn(cartItem);

// 		mockMvc.perform(post("/api/cart/add")
// 						.contentType(MediaType.APPLICATION_JSON)
// 						.content("{\"userId\":1,\"vehicleId\":1,\"quantity\":1}"))
// 				.andExpect(status().isOk())
// 				.andExpect(jsonPath("$.id").value(1));
// 	}

// 	@Test
// 	void getCart_ValidUser_ReturnsCartItems() throws Exception {
// 		Cart cartItem = createTestCartItem();
// 		when(cartService.getUserCart(anyLong()))
// 				.thenReturn(List.of(cartItem));

// 		mockMvc.perform(get("/api/cart/1"))
// 				.andExpect(status().isOk())
// 				.andExpect(jsonPath("$[0].userId").value(1));
// 	}

// 	@Test
// 	void removeFromCart_ValidRequest_ReturnsNoContent() throws Exception {
// 		doNothing().when(cartService).removeFromCart(anyLong(), anyLong());
// 		mockMvc.perform(delete("/api/cart/remove")
// 						.contentType(MediaType.APPLICATION_JSON)
// 						.content("{\"userId\":1,\"vehicleId\":1}"))
// 				.andExpect(status().isNoContent());
// 	}

// 	@Test
// 	void clearCart_ValidUser_ReturnsNoContent() throws Exception {
// 		doNothing().when(cartService).clearCart(anyLong());
// 		mockMvc.perform(delete("/api/cart/clear/1"))
// 				.andExpect(status().isNoContent());
// 	}

// 	// Edge Cases
// 	@Test
// 	void registerUser_ShortPassword_Returns400() throws Exception {
// 		mockMvc.perform(post("/auth/signup")
// 						.contentType(MediaType.APPLICATION_JSON)
// 						.content("{\"username\":\"test\",\"password\":\"short\"}"))
// 				.andExpect(status().isBadRequest());
// 	}

// 	@Test
// 	void calculateLoan_ZeroTerm_ReturnsBadRequest() throws Exception {
// 		mockMvc.perform(post("/vehicles/loan")
// 						.contentType(MediaType.APPLICATION_JSON)
// 						.content("{\"amount\":30000,\"downPayment\":5000,\"term\":0}"))
// 				.andExpect(status().isBadRequest());
// 	}
// }