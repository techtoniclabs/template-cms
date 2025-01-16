export function sortItems(props) {
  return props.sort(function (a, b) {
    return a.index - b.index;
  });
}
