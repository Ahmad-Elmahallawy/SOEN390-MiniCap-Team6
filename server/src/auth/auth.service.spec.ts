import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { CondoUnitService } from "../condoUnit/condoUnit.service";
import { Credentials } from "./Credentials";
import { PasswordService } from "./password.service";
import { TokenService } from "./token.service";
import { VALID_ID } from "../tests/auth/constants";
import { UserService } from "../user/user.service";

const VALID_CREDENTIALS: Credentials = {
  username: "Valid User",
  password: "Valid User Password",
};
const INVALID_CREDENTIALS: Credentials = {
  username: "Invalid User",
  password: "Invalid User Password",
};
const USER: any = {
  ...VALID_CREDENTIALS,
  createdAt: new Date(),
  firstName: "ofek",
  id: VALID_ID,
  lastName: "gabay",
  roles: ["admin"],
  updatedAt: new Date(),
};

const SIGN_TOKEN = "SIGN_TOKEN";
const CONDO_ID = 42;
const PROPERTY_ID = 42;

const authEntityService = {
  user(args: { where: { username: string } }): any | null {
    if (args.where.username === VALID_CREDENTIALS.username) {
      return USER;
    }
    return null;
  },
  findUserCondos(userID: number, args: any) {
    return [{condoID: CONDO_ID}];
  }
};

const condoUnitService = {
  getPropertyId(condoID: number) {
    return PROPERTY_ID;
  },
};

const passwordService = {
  compare(password: string, encrypted: string) {
    return true;
  },
};

const tokenService = {
  createToken(username: string, password: string) {
    return SIGN_TOKEN;
  },
};

describe("AuthService", () => {
  //ARRANGE
  let service: AuthService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: authEntityService,
        },
        {
          provide: PasswordService,
          useValue: passwordService,
        },
        {
          provide: TokenService,
          useValue: tokenService,
        },
        {
          provide: CondoUnitService,
          useValue: condoUnitService,
        },
        AuthService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("Testing the authService.validateUser()", () => {
    it("should validate a valid user", async () => {
      await expect(
        service.validateUser(
          VALID_CREDENTIALS.username,
          VALID_CREDENTIALS.password
        )
      ).resolves.toEqual({
        username: USER.username,
        roles: USER.roles,
        id: USER.id,
      });
    });

    it("should not validate a invalid user", async () => {
      await expect(
        service.validateUser(
          INVALID_CREDENTIALS.username,
          INVALID_CREDENTIALS.password
        )
      ).resolves.toBe(null);
    });
  });

  describe("Testing the authService.login()", () => {
    it("should return userInfo object for correct username and password", async () => {
      const loginResult = await service.login(VALID_CREDENTIALS);
      expect(loginResult).toEqual({
        username: USER.username,
        roles: USER.roles,
        accessToken: SIGN_TOKEN,
        id: USER.id,
      });
    });
  });
});
