import React from 'react'
import Select from '../../components/select/Select'
import Input from '../../components/input/Input'
import AutoCompleteWraper from '../../components/autocomplete-wraper/autoCompleteWraper'
import Button from '../../components/button/Button'
import { REVIEWSORT } from '../../Conf/config'
import { withContext } from '../../context'

import './Filter.css'

const Filter = ({
    onChangeSetOrder, order, onChangeSetDate, dateStart, dateEnd,
    onChangeTextChanged, name, onClickByCriticsName, renderReviews
}) => {
    return (
        <div>
            <div className="filter-wraper">
                <Select
                    title="Select"
                    onChange={onChangeSetOrder} 
                    value={order} 
                    filter={REVIEWSORT}
                />
                <Input 
                    id="date"
                    data-name="dateStart"
                    label="Start date"
                    value={dateStart}
                    onChange={onChangeSetDate}
                    type="date"
                />
                <Input 
                    id="date"
                    data-name="dateEnd"
                    label="End date"
                    value={dateEnd}
                    onChange={onChangeSetDate}
                    type="date"
                />

            </div>
            <AutoCompleteWraper>
                    <Input
                        id="critic-names"
                        value={name}
                        onChange={onChangeTextChanged}
                        type="text"
                        label="Get all movie reviews by critic names"
                    />
                    <Button onClick={onClickByCriticsName}>Submit</Button>
                    {renderReviews}
            </AutoCompleteWraper>
         </div>
    )
}

export default withContext(Filter)