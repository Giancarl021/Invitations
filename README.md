# Invitations

Simple invitations webpage that allows custom invitations based on a guest list.

## Usage

This application used [ViteJS](https://vitejs.dev/) to bundle the final application.

In order to generate static assets, you use the command:

```bash
npm run build
```

This will create a `dist` directory with all the static assets.

Keep in mind that the application requires a [invitation file](#invitation-file) on the `data/invitations.json` file in order to run properly.

You can change this behavior by editing the [`src/util/constants.json`](src/util/constants.json) file, in the `invitationUrl` key to a custom URL.

## Invitation File

The invitation file follows this schema:

```jsonc
{
    "name": "string", // The name of the event
    "lang": "string", // [OPTIONAL] The language of the page
    "message": "string", // The message to display on the invitation
    "host": "string", // The name of the host
    "words": { // [OPTIONAL] Translated words
        "from": "string", // The word "from" in the target language
        "to": "string" // The word "to" in the target language
    },
    "accept": { // Accept button properties
        "text": "string", // The text of the button
        "link": "string" // The URL that the button will redirect to
    },
    "deny": { // Deny button properties
        "text": "string", // The text of the button
        "link": "string" // The URL that the button will redirect to
    },
    "details": { // Details of the event such as date and address
        "detail1": "string", // Text-only detail
        "detail2": { // Link-based detail
            "text": "string", // The text of the detail
            "link": "string" // The URL that the detail will redirect to
        }
    },
    "guests": [ // [OPTIONAL] List of guests to display custom properties
        {
            "name": "string", // The name of the guest
            "id": "string", // The ID of the guest (used in the custom link)
            "overwrite": { // [OPTIONAL] 
                "message": "string", // [OPTIONAL] Custom message
                "accept": { // [OPTIONAL] Custom accept button properties
                    "text": "string", // [OPTIONAL] Text of the button
                    "link": "string" // [OPTIONAL] The URL that the button will redirect to
                },
                "deny": { // [OPTIONAL] Custom deny button properties
                    "text": "string", // [OPTIONAL] The text of the button
                    "link": "string" // [OPTIONAL] The URL that the button will redirect to
                }
            }
        }
    ]
}
```

## Custom links

If you added guests to the [invitation file](#invitation-file), you can use the `id` property to create custom links using the `g` query parameter.

For example:

Guest:
```json
{
    "name": "Foo Bar Jr.",
    "id": "foobar"
}
```

The custom link will be: `<your-url>?g=foobar`

## Updating the invitation file

As the application fetches the invitation file on every page view, it will always fetch the latest version of the file described in the `invitationUrl` value of the [`src/util/constants.json`](src/util/constants.json) file.

> **Note:** The browser can cache the file, so a newer version of the file may not be available when the application is loaded after the first load.