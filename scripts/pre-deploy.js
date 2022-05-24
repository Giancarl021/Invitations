const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const root = path.resolve(__dirname, '..');

if (!process.env.INVITATION_URL) throw new Error('INVITATION_URL is not set');

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
            invitationUrl: process.env.INVITATION_URL
        },
        null,
        4
    )
);

execSync('npm run build');

if (process.env.CNAME) fs.writeFileSync(path.join(root, 'dist', 'CNAME'), process.env.CNAME);