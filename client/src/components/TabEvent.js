import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
import ActivityFeed from "./ActivitiesFeed";
import Map from "./Map"
  export default function TabsDefault() {
    const data = [
      {
        label: "Activity Feed",
        value: "activity feed",
        desc: <ActivityFeed />,
        url: '/eventTab'
      },
      {
        label: "Announcements",
        value: "announcement",
        desc: <ActivityFeed />,
        url: '/announcements',
      },
      {
        label: "Map",
        value: "map",
        desc: <Map />,
      },
      {
        label: "Participants",
        value: "participants",
        desc: `Because it's about motivating the doers. Because I'm here
        to follow my dreams and inspire other people to follow their dreams, too.`,
        url: '/participants'
      },
      {
        label: "Settings",
        value: "settings",
        desc: `We're not always in the position that we want to be at.
        We're constantly growing. We're constantly making mistakes. We're
        constantly trying to express ourselves and actualize our dreams.`,
        url: '/settings'
      },
    ];
   
    return (
      <Tabs className="w-full">
        
          <TabsHeader>
            {data.map(({ label, value,url }) => (
              
              <Tab key={value} value={value}>
                {label}
              </Tab>

            ))}
          </TabsHeader>
          <TabsBody>
          
            {data.map(({ value, desc,url }) => (
              
                <TabPanel key={value} value={value}>
                    {desc}
                </TabPanel>
              
            ))}
            
          </TabsBody>
        
      </Tabs>
    );
  }