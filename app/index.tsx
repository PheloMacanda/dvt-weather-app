import { Text, TouchableOpacity, View } from "react-native";
import { Link } from 'expo-router';
import { screens } from "@/constants";

export default function Index() {

  // const router = useRouter();

  // const navigateToLogin = () => {
  //   router.push(screens.LOGIN);
  // };

  return (
    <View
      className="flex-1 justify-center items-center"
    >
      <Text>DVT Assessment</Text>
      <Link href={{
        pathname: screens.LOGIN
      }}>
        <Text>Login</Text>
      </Link>
    </View>
  );
}
