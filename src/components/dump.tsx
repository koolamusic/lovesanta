export default function Dump() {
  return {
    title: "Components/Dump",
  };
}

{
  /* Tags or Wishlist */
}
// From PairProfile Header cards
{
  /* Also we can also model tags to show relationship like: */
}
{
  /* cousin, brother, inlaw etc */
}
{
  /* <HStack spaceX={2}>
        {["Modelling", "Hiking", "Drawing", "Photo", "Design"].map((tag) => (
          <Badge
            key={tag}
            px={2}
            py={1}
            borderRadius="full"
            bg="gray.100"
            color="gray.800"
          >
            {tag}
          </Badge>
        ))}
      </HStack> */
}

// const Member = (props: Props) => {
//   const { name, avatar, email } = props;
//   const collection = createListCollection({ items: ["Write", "Read"] });

//   return (
//     <Stack
//       borderRadius={"xl"}
//       direction="row"
//       gap="8"
//       justify="space-between"
//       align="center"
//     >
//       <Stack direction="row" gap="3">
//         <Avatar src={avatar} name={name} />
//         <Box>
//           <Text textStyle="sm" fontWeight="medium">
//             {name}
//           </Text>
//           <Text textStyle="sm" color="fg.muted">
//             {email}
//           </Text>
//         </Box>
//       </Stack>
//       {/* <SelectRoot collection={collection} defaultValue={['Read']} size="sm" width="20">
//         <SelectTrigger>
//           <SelectValueText placeholder="Month" />
//         </SelectTrigger>
//         <SelectContent>
//           {collection.items.map((item) => (
//             <SelectItem item={item} key={item}>
//               {item}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </SelectRoot> */}
//     </Stack>
//   );
// };
