import React, {useState} from "react";
import {Avatar, Grid, GridItem, Image, Text, Stack} from "@chakra-ui/react";

import data from "../mock/data.json";

interface NavTypes {
  label: string;
  active?: boolean;
}
interface CardElements {
  label: string;
  lapse: string;
  currentHours: number;
  previousHours: number;
}
const lapseLabel = [
  {lapse: "daily", lapseLabel: "Day"},
  {lapse: "weekly", lapseLabel: "Week"},
  {lapse: "monthly", lapseLabel: "Month"},
];
const bgColors = [
  {id: "Work", color: "hsl(15, 100%, 70%)", icon: "icon-work.svg"},
  {id: "Play", color: "hsl(195, 74%, 62%)", icon: "icon-play.svg"},
  {id: "Study", color: "hsl(348, 100%, 68%)", icon: "icon-study.svg"},
  {id: "Exercise", color: "hsl(145, 58%, 55%)", icon: "icon-exercise.svg"},
  {id: "Social", color: "hsl(264, 64%, 52%)", icon: "icon-social.svg"},
  {id: "Self Care", color: "hsl(43, 84%, 65%)", icon: "icon-self-care.svg"},
];

const Card = (props: CardElements) => {
  return (
    <Stack
      _hover={{cursor: "pointer"}}
      backgroundColor={bgColors
        .filter((color) => color.id == props.label)
        .map((color) => color.color)}
      borderRadius={12}
    >
      <Stack
        backgroundImage={
          "url('/assets/" +
          bgColors.filter((color) => color.id == props.label).map((color) => color.icon) +
          "')"
        }
        backgroundPosition="95%"
        backgroundRepeat="no-repeat"
        height={8}
      />
      <Stack
        _hover={{backgroundColor: "primary.700"}}
        backgroundColor="secondary.300"
        borderRadius={12}
        padding={[4, 6]}
        spacing={0}
        style={{marginTop: 0}}
      >
        <Stack alignItems="center" direction="row" justifyContent="space-between">
          <Text fontSize="18px" fontWeight="500">
            {props.label}
          </Text>
          <Image alt="icon-ellipsis" height={1} src="/assets/icon-ellipsis.svg" />
        </Stack>
        <Stack
          alignItems={["center", "flex-start"]}
          direction={["row", "column"]}
          justifyContent="space-between"
        >
          <Text fontSize={["xl", "4xl"]} fontWeight="400">
            {props.currentHours}hrs
          </Text>
          <Text fontSize={["sm", "md"]}>
            Last {props.lapse} - {props.previousHours}hrs
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

const App: React.FC = () => {
  const [selectedLapse, setSelectedLapse] = useState("daily");

  const NavElement = (props: NavTypes) => {
    return (
      <Text
        _hover={{cursor: "pointer", color: "whiteAlpha.900"}}
        color={props.label == selectedLapse ? "whiteAlpha.900" : "primary.600"}
        textTransform="capitalize"
        onClick={() => setSelectedLapse(props.label)}
      >
        {props.label}
      </Text>
    );
  };
  const Profile = () => {
    return (
      <Stack backgroundColor="secondary.300" borderRadius={12} height="100%">
        <Stack
          backgroundColor="primary.500"
          borderRadius={12}
          direction={["row", "column"]}
          padding={6}
          spacing={0}
        >
          <Avatar showBorder alt="jeremy" borderWidth={2} src="/assets/image-jeremy.png" />
          <Stack paddingX={[4, 0]} spacing={0}>
            <Text fontSize="xs" paddingTop={[0, 6]}>
              Report for
            </Text>
            <Text fontSize="3xl" fontWeight="400" lineHeight={1.2}>
              Jeremy Robson
            </Text>
          </Stack>
        </Stack>
        <Stack
          direction={["row", "column"]}
          height="100%"
          justifyContent={["space-between", "center"]}
          padding={[5, 6]}
        >
          <NavElement label="daily" />
          <NavElement label="weekly" />
          <NavElement label="monthly" />
        </Stack>
      </Stack>
    );
  };

  return (
    <Stack
      backgroundColor="secondary.200"
      color="whiteAlpha.900"
      height={[null, "100vh"]}
      justifyContent="center"
      paddingX={[8, 0]}
      paddingY={[12, null]}
      width="100%"
    >
      <Stack alignSelf="center" borderRadius={12} width={[null, "container.lg"]}>
        <Grid gap={4} templateColumns={["repeat(1, 1fr)", "repeat(4, 1fr)"]}>
          <GridItem rowSpan={2}>
            <Profile />
          </GridItem>
          {data.map((item) => {
            return (
              <Card
                key={item.title}
                currentHours={Number(
                  Object.entries(item.timeframes)
                    .filter((it) => it[0] == selectedLapse)
                    .map((it) => it[1].current),
                )}
                label={item.title}
                lapse={String(
                  lapseLabel
                    .filter((lapse) => lapse.lapse == selectedLapse)
                    .map((lapse) => lapse.lapseLabel),
                )}
                previousHours={Number(
                  Object.entries(item.timeframes)
                    .filter((it) => it[0] == selectedLapse)
                    .map((it) => it[1].previous),
                )}
              />
            );
          })}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default App;
