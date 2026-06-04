export default function Page() {
    return (
        <div>
            <form>
                <label htmlFor="name">Job Name:</label>
                <input type="text" id="name" name="name" required />

                <label htmlFor="hourly_wage">Hourly Wage:</label>
                <input type="number" id="hourly_wage" name="hourly_wage" required />

                <label htmlFor="color">Color:</label>
                <input type="color" id="color" name="color" required />

                <button type="submit">Create Job</button>
            </form>
        </div>
    );
}