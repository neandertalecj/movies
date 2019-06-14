import React from 'react'
import Select from '../../components/select/Select'
import Input from '../../components/input/Input'
import AutoCompleteWraper from '../../components/autocomplete-wraper/autoCompleteWraper'
import Button from '../../components/button/Button'
import { REVIEWSORT } from '../../Conf/config'

import './Filter.css'

const Filter = ({
    onChangeSetOrder, valueOrder, onChangeSetDate, valueDateStart, valueDateEnd,
    onChangeTextChanged, valueName, onClickByCriticsName, renderReviews
}) => {
    return (
        <div>
            <div className="filter-wraper">
                <Select
                    title="Select"
                    onChange={onChangeSetOrder} 
                    value={valueOrder} 
                    filter={REVIEWSORT}
                />
                <Input 
                    id="date"
                    data-name="dateStart"
                    label="Start date"
                    value={valueDateStart}
                    onChange={onChangeSetDate}
                    type="date"
                />
                <Input 
                    id="date"
                    data-name="dateEnd"
                    label="End date"
                    value={valueDateEnd}
                    onChange={onChangeSetDate}
                    type="date"
                />

            </div>
            <AutoCompleteWraper>
                    <Input
                        id="critic-names"
                        value={valueName}
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

export default Filter