export const filterListByList = (list, selected) => {
  return list.reduce((acc, comp) => {
    selected.forEach(prop => {
      if (comp.props.includes(prop) && !acc.includes(comp)) acc.push(comp)
    })
    return acc;
  }, [])
}

export const filterListById = (list, selected) => {
  return list.filter(({id}) => selected.includes(id))
}

export const getPropsFromComps = (list, selected) => {
  return Array.from( new Set(list.reduce((acc, {id, props}) => {
    if (selected.includes(id)) acc.push(...props);
    return acc
  }, [])))
}

export const findByName = (list, search) => {
  if (!search) return list;
  return list.filter(({name}) => name.toLowerCase().includes(search.toLowerCase()))
}