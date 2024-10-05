import { Colors } from "@/constants/Colors";
import { FC, PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  useSafeArea?: boolean;
}

const Wrapper: FC<PropsWithChildren<Props>> = ({
  children,
  useSafeArea = true,
}) => {
  if (!useSafeArea) {
    return <View style={styles.wrapper}>{children}</View>;
  }

  return (
    <SafeAreaView edges={["top"]} style={styles.wrapper}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
  },
});

export default Wrapper;
