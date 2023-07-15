import { render, screen, fireEvent, act } from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "../../navigation/AppStack";
import MoviesScreen from "../../screens/MoviesScreen";

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

jest.mock("@expo/vector-icons/FontAwesome", () => "FontAwesome");
jest.mock("@expo/vector-icons/AntDesign", () => "AntDesign");
jest.mock("@expo/vector-icons/Feather", () => "Feather");
jest.mock("expo-linear-gradient", () => "LinearGradient");

beforeEach(() => {
  jest.resetAllMocks();
});

const component = (
  <NavigationContainer>
    <MoviesScreen />
  </NavigationContainer>
);

describe("MovieScreen", function () {
  it("should display menu button", async () => {
    render(component);
    const menuBtn = await screen.getByTestId("menu-btn");
    expect(menuBtn).toBeOnTheScreen();
  });

  it("should display search button and icon", async () => {
    render(component);
    const searchBtn = await screen.getByTestId("search-btn");
    expect(searchBtn).toBeOnTheScreen();
  });

  it("should display movie title for screen", async () => {
    render(component);
    const movieTitle = await screen.getByTestId("movie-title");
    expect(movieTitle).toHaveTextContent("Movies");
  });

  // expect(screen.toJSON()).toMatchSnapshot();
});
