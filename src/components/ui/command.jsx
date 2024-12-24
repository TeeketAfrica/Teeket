import { Box, Modal, ModalContent, Text } from "@chakra-ui/react";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import * as React from "react";

const Command = ({ className, ...props }, ref) => (
  <CommandPrimitive ref={ref} className="command-primitive-custom" {...props} />
);
Command.displayName = CommandPrimitive.displayName;

const CommandDialog = ({ children, ...props }) => {
  return (
    <Modal {...props}>
      <ModalContent>
        <Command>{children}</Command>
      </ModalContent>
    </Modal>
  );
};

const CommandInput = (
  { className, showSearchIcon = true, containerClassName, ...props },
  ref
) => (
  <Box cmdk-input-wrapper="">
    {showSearchIcon && <Search />}
    <CommandPrimitive.Input ref={ref} {...props} />
  </Box>
);

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = ({ className, ...props }, ref) => (
  <CommandPrimitive.List ref={ref} {...props} />
);

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = (props, ref) => (
  <CommandPrimitive.Empty ref={ref} {...props} />
);

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = ({ className, ...props }, ref) => (
  <CommandPrimitive.Group ref={ref} {...props} />
);

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = ({ className, ...props }, ref) => (
  <CommandPrimitive.Separator ref={ref} {...props} />
);
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = ({ className, ...props }, ref) => (
  <CommandPrimitive.Item ref={ref} {...props} />
);

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({ className, ...props }) => {
  return <Text ml="auto" fontSize="xs" fontWeight="medium" {...props} />;
};
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
