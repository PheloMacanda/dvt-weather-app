import { Text, View } from "react-native";
import { Link } from 'expo-router';
import { screens } from "@/constants";
import i18n from "@/i18n";

export default function Index() {

  const { t } = i18n;

  return (
    <View
      className="flex-1 justify-center items-center"
    >
      <Text>DVT Assessment</Text>
      <Link href={{
        pathname: screens.LOGIN
      }}>
        <Text>{t("login")}</Text>
      </Link>
    </View>
  );
}
