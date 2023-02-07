import React, { useState } from 'react';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import { setCalmSetting } from '../state/settings';
import { Dialog, DialogContent } from './Dialog';
import { Button } from './Button';
import { useCharges } from '../state/docket';
import { GroupLink } from './GroupLink';

interface Group {
  title: string;
  description: string;
  icon: string;
  color: string;
  link: string;
}

interface App {
  title: string;
  description: string;
  image: string;
  color: string;
  link: string;
}

const groups: Record<string, Group> = {
  foundation: {
    title: 'Urbit Foundation',
    description: 'Learn about the Urbit Project',
    icon: 'https://interstellar.nyc3.digitaloceanspaces.com/battus-datsun/2022.11.07..19.39.22-Sig.png',
    color: 'bg-black',
    link: '/apps/groups/groups/~halbex-palheb/uf-public',
  },
  door: {
    title: 'door.link',
    description: 'A cult of music lovers',
    icon: 'https://www.door.link/logowhite.svg',
    color: 'bg-black',
    link: '/apps/groups/groups/~natnex-ronret/door-link',
  },
  tlonPublic: {
    title: 'Tlon Public',
    description: 'A place to ask for help',
    icon: 'https://sfo3.digitaloceanspaces.com/zurbit-images/dovsem-bornyl/2022.6.16..19.11.20-flooring.jpeg',
    color: 'bg-yellow-500',
    link: '/apps/groups/groups/~nibset-napwyn/tlon',
  },
};

const AppLink = ({ link, title, description, image, color }: App) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-2">
        {image !== '' ? (
          <img
            src={image}
            className="h-8 w-8 rounded"
            style={{ backgroundColor: color }}
          />
        ) : (
          <div className="h-8 w-8 rounded" style={{ backgroundColor: color }} />
        )}
        <div className="flex flex-col">
          <span className="font-semibold">{title}</span>
          {description && (
            <span className="text-sm font-semibold text-gray-400">
              {description}
            </span>
          )}
        </div>
      </div>
      <Button variant="alt-primary" as="a" href={link} target="_blank">
        Open App
      </Button>
    </div>
  );
};

function LandscapeDescription() {
  const charges = useCharges();
  console.log({ charges });
  return (
    <div className="flex flex-col leading-5">
      <h1 className="my-8 text-2xl font-bold">Where am I?</h1>
      <p>
        Tlon Corporation’s “Landscape”, a simple interface for finding,
        downloading, and displaying Urbit software downloaded to your personal
        urbit.
      </p>
      <h1 className="my-8 text-2xl font-bold">What can I do here?</h1>
      <p>
        Landscape comes pre-packaged with a few basic software utilities
        developed by Tlon. You can add additional software be searching for a
        software developer, like “~paldev”.
      </p>
      <div className="mt-8 space-y-2">
        <AppLink
          title="Groups"
          description="Build or join Urbit-based communities"
          link="/apps/groups"
          image={charges.groups?.image || ''}
          color={charges.groups?.color || 'bg-gray'}
        />
        <AppLink
          title="Talk"
          description="Simple instant messaging app"
          link="/apps/talk"
          image={charges.talk?.image || ''}
          color={charges.talk?.color || 'bg-blue'}
        />
        <AppLink
          title="Terminal"
          description="Pop open the hood of your urbit"
          link="/apps/webterm"
          image={charges.webterm?.image || ''}
          color={charges.webterm?.color || 'bg-black'}
        />
      </div>
      <h1 className="my-8 text-2xl font-bold">Where are the people?</h1>
      <p className="mt-4">
        Here are some groups we recommend joining to learn more about Groups and
        how to use it in interesting ways:
      </p>
      <div className="mt-8 space-y-2">
        <GroupLink
          title={groups.foundation.title}
          description={groups.foundation.description}
          icon={groups.foundation.icon}
          color={groups.foundation.color}
          link={groups.foundation.link}
        />
        <GroupLink
          title={groups.door.title}
          description={groups.door.description}
          icon={groups.door.icon}
          color={groups.door.color}
          link={groups.door.link}
        />
        <GroupLink
          title={groups.tlonPublic.title}
          description={groups.tlonPublic.description}
          icon={groups.tlonPublic.icon}
          color={groups.tlonPublic.color}
          link={groups.tlonPublic.link}
        />
      </div>
    </div>
  );
}

export default function LandscapeWayfinding() {
  const [showModal, setShowModal] = useState(false);

  const handleHide = () => {
    setCalmSetting('disableWayfinding', true);
  };

  return (
    <Dropdown.Root>
      <div className="absolute left-4 bottom-16 z-50">
        <Dropdown.Trigger className="relative" asChild>
          <button className="h-9 w-9 cursor-pointer rounded-lg bg-black text-xl text-white">
            ?
          </button>
        </Dropdown.Trigger>
        <Dropdown.Content
          side="bottom"
          sideOffset={8}
          className="new-dropdown mx-4 flex w-[208px] flex-col space-y-2 rounded-lg bg-white p-4 text-sm font-semibold text-black drop-shadow-lg"
        >
          <Dropdown.Item asChild className="new-dropdown-item p-2">
            <span
              onClick={() => setShowModal(true)}
              className="cursor-pointer text-blue"
            >
              Basic Wayfinding
            </span>
          </Dropdown.Item>
          <Dropdown.Separator asChild>
            <hr className="my-2 border-[1px] border-gray-50" />
          </Dropdown.Separator>
          <Dropdown.Item asChild className="new-dropdown-item p-2">
            <a
              className="no-underline"
              href="/apps/groups/groups/~nibset-napwyn/tlon"
              target="_blank"
            >
              Help & Support
            </a>
          </Dropdown.Item>
          <Dropdown.Item asChild className="new-dropdown-item p-2">
            <a
              className="no-underline"
              href="https://airtable.com/shrflFkf5UyDFKhmW"
              target="_blank"
              rel="noreferrer"
            >
              Submit Feedback
            </a>
          </Dropdown.Item>
          <Dropdown.Item asChild className="new-dropdown-item p-2">
            <span className="cursor-pointer" onClick={handleHide}>
              Hide This Button
            </span>
          </Dropdown.Item>
        </Dropdown.Content>
      </div>
      <Dialog open={showModal} onOpenChange={() => setShowModal(false)}>
        <DialogContent
          // onOpenAutoFocus={(e) => e.preventDefault()}
          showClose={false}
          containerClass="focus:outline-none"
        >
          <LandscapeDescription />
        </DialogContent>
      </Dialog>
    </Dropdown.Root>
  );
}