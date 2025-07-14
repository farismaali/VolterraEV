package com.volterraev;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
class BackendApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private AuthenticationService authService;

	@MockBean
	private JwtService jwtService;

	@MockBean
	private VehicleService vehicleService;

	@MockBean
	private CartService cartService;

	@Autowired
	private VehicleController vehicleController;

	@Autowired
	private AuthenticationController authController;

	@Test
	void contextLoads() {
		assertNotNull(mockMvc);
	}

	// Auth Tests (4)
	@Test
	void authRegister_ValidRequest_Returns201() throws Exception {
		mockMvc.perform(post("/auth/signup")
						.contentType(MediaType.APPLICATION_JSON)
						.content("{\"username\":\"test\",\"password\":\"Pass123!\"}"))
				.andExpect(status().isCreated());
	}

	@Test
	void authRegister_ShortPassword_Returns400() throws Exception {
		mockMvc.perform(post("/auth/signup")
						.content("{\"username\":\"test\",\"password\":\"short\"}"))
				.andExpect(status().isBadRequest());
	}

	@Test
	void authLogin_ValidCreds_ReturnsJwt() throws Exception {
		when(authService.authenticate(any())).thenReturn(new User());
		when(jwtService.generateToken(any())).thenReturn("mock.jwt");

		mockMvc.perform(post("/auth/login")
						.content("{\"username\":\"test\",\"password\":\"pass\"}"))
				.andExpect(jsonPath("$.token").exists());
	}

	@Test
	void authLogin_InvalidCreds_Returns401() throws Exception {
		when(authService.authenticate(any()))
				.thenThrow(new BadCredentialsException("Invalid"));

		mockMvc.perform(post("/auth/login")
						.content("{\"username\":\"wrong\",\"password\":\"wrong\"}"))
				.andExpect(status().isUnauthorized());
	}

	// Vehicle Tests (4)
	@Test
	void vehicleGetAll_ReturnsList() throws Exception {
		when(vehicleService.getAllVehicle())
				.thenReturn(List.of(new Vehicle(1L, "Tesla", "Model 3", 2023)));

		mockMvc.perform(get("/vehicles"))
				.andExpect(jsonPath("$[0].brand").value("Tesla"));
	}

	@Test
	void vehicleLoanCalc_ValidRequest_ReturnsValue() throws Exception {
		when(vehicleService.calculateLoan(any()))
				.thenReturn(483.15);

		mockMvc.perform(post("/vehicles/loan")
						.content("{\"amount\":30000,\"downPayment\":5000,\"term\":60}"))
				.andExpect(content().string("483.15"));
	}

	@Test
	void vehicleAddAccident_ValidRequest_Returns201() throws Exception {
		mockMvc.perform(post("/vehicles/accident/1")
						.content("{\"accidentDate\":\"2023-01-01\",\"description\":\"Minor\"}"))
				.andExpect(status().isCreated());
	}

	@Test
	void vehicleDelete_ValidRequest_Returns204() throws Exception {
		mockMvc.perform(delete("/vehicles?vid=1"))
				.andExpect(status().isNoContent());
	}

	// Cart Tests (4)
	@Test
	void cartAddItem_ValidRequest_Returns200() throws Exception {
		mockMvc.perform(post("/api/cart/add")
						.content("{\"userId\":1,\"vehicleId\":1,\"quantity\":1}"))
				.andExpect(status().isOk());
	}

	@Test
	void cartGetItems_ValidUser_ReturnsList() throws Exception {
		when(cartService.getUserCart(1L))
				.thenReturn(List.of(new Cart()));

		mockMvc.perform(get("/api/cart/1"))
				.andExpect(jsonPath("$").isArray());
	}

	@Test
	void cartRemoveItem_ValidRequest_Returns204() throws Exception {
		mockMvc.perform(delete("/api/cart/remove")
						.content("{\"userId\":1,\"vehicleId\":1}"))
				.andExpect(status().isNoContent());
	}

	@Test
	void cartClear_ValidUser_Returns204() throws Exception {
		mockMvc.perform(delete("/api/cart/clear/1"))
				.andExpect(status().isNoContent());
	}

	// Edge Cases (4)
	@Test
	void loanCalc_ZeroTerm_ThrowsException() {
		LoanRequestDto dto = new LoanRequestDto(30000, 5000, 0, 5.0);
		assertThrows(IllegalArgumentException.class,
				() -> vehicleController.calculateLoan(dto));
	}

	@Test
	void authRegister_NullUsername_ThrowsException() {
		UserRegisterDto dto = new UserRegisterDto(null, "password");
		assertThrows(MethodArgumentNotValidException.class,
				() -> authController.register(dto));
	}

	@Test
	void cartGet_NonExistentUser_ReturnsEmpty() {
		when(cartService.getUserCart(999L)).thenReturn(List.of());
		assertEquals(0, cartController.getCart(999L).getBody().size());
	}

	@Test
	void vehicleAccident_NullDate_ThrowsException() {
		AccidentRequestDto dto = new AccidentRequestDto(null, "No date");
		assertThrows(MethodArgumentNotValidException.class,
				() -> vehicleController.addAccidentToVehicle(1L, dto));
	}
}
