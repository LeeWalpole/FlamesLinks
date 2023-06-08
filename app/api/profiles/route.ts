import { NextResponse } from "next/server"

export async function GET(request: Request) {
  return NextResponse.json([
    {
      id: 1,
      display_name: "Display Name",
      username: "username",
      socials: {
        instagram: "https://www.instagram.com/username_1",
        facebook: "https://www.faceebook.com/username_1",
        twitter: "https://www.twitter.com/username_1",
        twitch: "https://www.twitch.com/username_1",
      },
      weblinks: [
        {
          link: "https://www.website.com/username_1",
          link_text: "Link Text",
        },
        {
          link: "https://www.website.com/username_1",
          link_text: "Link Text",
        },
      ],
    },
    {
      id: 2,
      display_name: "Display Name 2",
      username: "username",
      socials: {
        instagram: "https://www.instagram.com/username_1",
        facebook: "https://www.faceebook.com/username_1",
        twitter: "https://www.twitter.com/username_1",
        twitch: "https://www.twitch.com/username_1",
      },
      weblinks: [
        {
          link: "https://www.website.com/username_1",
          link_text: "Link Text",
        },
        {
          link: "https://www.website.com/username_1",
          link_text: "Link Text",
        },
      ],
    },
  ])
}
