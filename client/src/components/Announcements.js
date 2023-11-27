import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Announcement"];

const TABLE_ROWS = [
    {
        announement: "The events will be held on 28/11/2023",

    },
    {
        announement: "Do all the first stage tasks before 28/8/2023",

    },
    {
        announement: "Since the late arrival of the website's figma, we are all behind schedule. Please try to catch up with the schedule",

    },
    {
        announement: "The map is now unavailable. We are trying to fix it as soon as possible. Sorry for the inconvenience",

    },
    {
        announement: "The event wiil soon be held. Please try to finish all the tasks as soon as possible.",
    },
];

export default function TableWithStripedRows() {
    return (
        <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 ">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {TABLE_ROWS.map(({ announement }, index) => (
                        <tr key={announement} className="even:bg-blue-gray-50/50">
                            <td className="p-6">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {announement}
                                </Typography>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    );
}