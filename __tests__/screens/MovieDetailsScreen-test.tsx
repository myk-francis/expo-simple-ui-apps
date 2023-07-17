import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";
import { NavigationContainer } from "@react-navigation/native";
import Loading from "../../components/Loading";
import axios from "axios";
import { fetchPersonDetails } from "../../api/movieDB";
import { cleanup } from "@testing-library/react-native";
import MockAdapter from "axios-mock-adapter";
import fetchMock from "fetch-mock";
import MovieDetailsScreen from "../../screens/MovieDetailsScreen";

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
jest.mock("@expo/vector-icons/FontAwesome", () => "FontAwesome");
jest.mock("@expo/vector-icons/AntDesign", () => "AntDesign");
jest.mock("@expo/vector-icons/Feather", () => "Feather");
jest.mock("expo-linear-gradient", () => "LinearGradient");

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({ goBack: jest.fn() }),
  useRoute: () => ({
    params: {
      person: {
        adult: false,
        gender: 1,
        id: 20,
        known_for_department: ["acting"],
        name: "mike",
        original_name: "Michael",
        popularity: 100,
        profile_path: "somewhere",
        cast_id: 1,
        character: "string",
        credit_id: "1",
        order: 1,
      },
    },
  }),
}));

const component = (
  <NavigationContainer>
    <MovieDetailsScreen />
  </NavigationContainer>
);

describe("MovieDetailsScreen", function () {
  it("should initially display loading component", async () => {
    render(component);

    await waitFor(() => {
      expect(screen.getByTestId("back-btn")).toBeOnTheScreen();
    });
  });
});
