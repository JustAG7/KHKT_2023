import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import ActivityFeed from "./ActivitiesFeed";
import Announcements from "./Announcements";
import Participants from "./Participants";
import OutOfEventDialog from "./OutOfEventDialog";
import Map from "./Map";
export default function TabsDefault() {
  const data = [
    {
      label: "Activity Feed",
      value: "activity feed",
      desc: <ActivityFeed />,
      url: "/eventTab",
    },
    {
      label: "Announcements",
      value: "announcement",
      desc: <Announcements />,
      url: "/announcements",
    },
    {
      label: "Map",
      value: "map",
      desc: <Map />,
    },
    {
      label: "Participants",
      value: "participants",
      desc: <Participants />,
      url: "/participants",
    },
    {
      label: "Settings",
      value: "settings",
      desc: <OutOfEventDialog />,
      url: "/settings",
    },
  ];

  return (
    <Tabs className="w-full">
      <TabsHeader>
        {data.map(({ label, value, url }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc, url }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
