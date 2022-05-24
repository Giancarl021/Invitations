const path = require('path');
const fs = require('fs');

const INVITATION_URL = '/data/invitations.json';

const root = path.resolve(__dirname, '..');

const constantsPath = path.join(root, 'src', 'util', 'constants.json');

fs.writeFileSync(
    constantsPath,
    JSON.stringify(
        {
            ...JSON.parse(
                fs.readFileSync(
                    constantsPath,
                    'utf8'
                )
            ),
            invitationUrl: INVITATION_URL
        },
        null,
        4
    )
);

fs.rmSync(path.join(root, 'dist'), { recursive: true, force: true });